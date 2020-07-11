from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data

        #user.is_employee = data.get('is_employee')
        #user.employees.set(data.get('employees'))

        user.save()
        return user