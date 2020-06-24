from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.is_admin = data.get('is_admin')
        user.is_employee = data.get('is_employee')
        user.is_manager = data.get('is_manager')
        user.license_expiration_date = data.get('license_expiration_date')
        user.business_name = data.get('business_name')
        user.billing_address = data.get('billing_address')
        user.iban = data.get('iban')

        user.save()
        return user