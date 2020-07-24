from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from users.models import CustomUser

class CustomRegisterSerializer(RegisterSerializer):
        #is_employee = serializers.BooleanField(default=False)
        #employees = serializers.RelatedField(many=True, required=False, queryset=CustomUser.objects.all())

        def get_cleaned_data(self):
            data_dict = super().get_cleaned_data()
            #data_dict['is_employee'] = self.validated_data.get('is_employee', '')
            #data_dict['employees'] = self.validated_data.get('employees', '')
            return data_dict

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'is_admin', 'is_employer', 'is_employee', 'employer', 'iban')

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(CustomUserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email')

        # so it doesnt change when saving
        #instance.set_password(validated_data.get('password', instance.password))
        instance.is_admin = validated_data.get('is_admin')
        instance.is_employer = validated_data.get('is_employer')
        instance.is_employee = validated_data.get('is_employee')

        instance.employer = validated_data.get('employer')
        instance.iban = validated_data.get('iban')
        instance.save()
        return instance
