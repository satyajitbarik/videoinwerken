from rest_framework import serializers

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.registration.serializers import RegisterSerializer

# custom serializer for registering
from users.models import CustomUser


class CustomRegisterSerializer(RegisterSerializer):
       # iban = serializers.CharField(max_length=255, required=False)
        id = serializers.UUIDField()
        is_admin = serializers.BooleanField(default=False)
        is_employee = serializers.BooleanField(default=False)
        is_manager = serializers.BooleanField(default=False)
        license_expiration_date = serializers.DateField(required=False)
        business_name = serializers.CharField(max_length=255, allow_blank=True, required=False)
        billing_address = serializers.CharField(max_length=255, allow_blank=True, required=False)
        iban = serializers.CharField(max_length=255, allow_blank=True, required=False)


        def get_cleaned_data(self):
            data_dict = super().get_cleaned_data()
            data_dict['id'] = self.validated_data.get('id', '')
            data_dict['is_admin'] = self.validated_data.get('is_admin', '')
            data_dict['is_employee'] = self.validated_data.get('is_employee', '')
            data_dict['is_manager'] = self.validated_data.get('is_manager', '')
            #data_dict['license_expiration_date'] = self.validated_data.get('license_expiration_date', '')
            data_dict['business_name'] = self.validated_data.get('business_name', '')
            data_dict['billing_address'] = self.validated_data.get('billing_address', '')
            data_dict['iban'] = self.validated_data.get('iban', '')

            return data_dict

# serializer for viewset
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('is_admin', 'is_employee', 'is_manager', 'license_expiration_date', 'business_name', 'billing_address', 'iban')