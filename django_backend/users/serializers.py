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
        #fields = ('id', 'email', 'is_employee', 'employees')
        fields = ('id', 'email', 'username',)