from rest_framework import serializers

from videoinwerken_employee.models import EmployeeQuestion


class EmployeeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeQuestion
        fields = (
            'id',
            'employee',
            'question',
            'attempted',
            'passed',
        )

    def create(self, validated_data):
        validated_data['employee'] = self.request.user.pk;
        return super(EmployeeQuestionSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        instance.attempted = validated_data.get('attempted')
        instance.passed = validated_data.get('passed')
        instance.save()
        return instance




