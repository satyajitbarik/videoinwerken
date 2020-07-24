from rest_framework.permissions import BasePermission

from users.models import CustomUser


class IsEmployer(BasePermission):
    message = 'You must be an employer to access this.'

    def has_permission(self, request, view):
        member = CustomUser.objects.get(id=request.user.pk)
        if (member.is_employer):
            return True
        return False

    # still not sure why this is necessary
    def has_object_permission(self, request, view, obj):
        member = CustomUser.objects.get(id=request.user.pk)
        if (member.is_employer):
            return True
        return False

class IsEmployee(BasePermission):
    message = 'You must be an employee to access this.'

    def has_permission(self, request, view):
        member = CustomUser.objects.get(id=request.user.pk)
        if (member.is_employee):
            return True
        return False

    # still not sure why this is necessary
    def has_object_permission(self, request, view, obj):
        member = CustomUser.objects.get(id=request.user.pk)
        if (member.is_employee):
            return True
        return False


