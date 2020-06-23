from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer


class UserSerializer(UserDetailsSerializer):

    #website = serializers.URLField(source="userprofile.website", allow_blank=True, required=False)
    #about = serializers.CharField(source="userprofile.about", allow_blank=True, required=False)

    is_admin = serializers.BooleanField(source="userprofile.is_admin", default=False)
    is_employee = serializers.BooleanField(source="userprofile.is_employee", default=False)

    is_manager = serializers.BooleanField(source="userprofile.is_manager", default=False)
    license_expiration_date = serializers.DateField(source="userprofile.license_expiration_date", required=False)
    business_name = serializers.CharField(source="userprofile.business_name", allow_blank=True, required=False)
    billing_address = serializers.CharField(source="userprofile.billing_address", allow_blank=True, required=False)
    iban = serializers.CharField(source="userprofile.iban", allow_blank=True, required=False)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('is_admin', 'is_employee', 'is_manager', 'license_expiration_date', 'business_name', 'billing_address', 'iban')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        iban = profile_data.get('iban')
        #is_admin = profile_data.get('is_admin')
     #   is_employee = profile_data.get('is_employee')
        #is_manager = profile_data.get('is_manager')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data:
            if iban:
                profile.iban = iban
            profile.save()
        return instance