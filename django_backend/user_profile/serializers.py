from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

from user_profile.models import UserProfile

User = get_user_model()

class UserSerializer(UserDetailsSerializer):


    is_admin = serializers.BooleanField(source="userprofile.is_admin", default=False)
    is_employee = serializers.BooleanField(source="userprofile.is_employee", default=False)
    is_manager = serializers.BooleanField(source="userprofile.is_manager", default=False)
    license_expiration_date = serializers.DateField(source="userprofile.license_expiration_date", required=False)
    business_name = serializers.CharField(source="userprofile.business_name", allow_blank=True, required=False)
    billing_address = serializers.CharField(source="userprofile.billing_address", allow_blank=True, required=False)
    iban = serializers.CharField(source="userprofile.iban", allow_blank=True, required=False)

    #employees = serializers.RelatedField(source="userprofile.employees", many=True)
    #employees = serializers.SerializerMethodField()

    class Meta(UserDetailsSerializer.Meta):

        fields = UserDetailsSerializer.Meta.fields + ('is_admin', 'is_employee', 'is_manager', 'license_expiration_date', 'business_name', 'billing_address', 'iban', 'employees')

    #def get_employees(self, obj):
        #return obj.employees.all()

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        is_admin = profile_data.get('is_admin')
        is_employee = profile_data.get('is_employee')
        is_manager = profile_data.get('is_manager')
        license_expiration_date = profile_data.get('license_expiration_date')
        business_name = profile_data.get('business_name')
        billing_address = profile_data.get('billing_address')
        iban = profile_data.get('iban')
        employees = profile_data.get('employees')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data:

            if is_admin:
                profile.is_admin = is_admin
            if is_employee:
                profile.is_employee = is_employee
            if is_manager:
                profile.is_manager = is_manager
            if license_expiration_date:
                profile.license_expiration_date = license_expiration_date
            if business_name:
                profile.business_name = business_name
            if billing_address:
                profile.billing_address = billing_address
            if iban:
                profile.iban = iban
            if employees:
                profile.employees = employees
            profile.save()
        return instance

class EmployeeManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'employee_user_id',
            'manager_user_id',
        )

