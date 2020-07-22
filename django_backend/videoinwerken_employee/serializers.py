from rest_framework import serializers

from videoinwerken_employee.models import EmployeeQuestion


class EmployeeQuestionSerializer(serializers.ModelSerializer):

   # employee = serializers.SerializerMethodField(read_only=True)

   # question = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EmployeeQuestion
        fields = (
            'id',
            'employee',
            'question',
            'attempted',
            'passed',
        )

# this doesnt work, theres no request.user in serialize
    #def create(self, request):
        #validated_data['employee'] = self.request.user.pk;
        #serializer = EmployeeQuestionSerializer(employee=request.user.pk)
        #return super(EmployeeQuestionSerializer, self).create(validated_data)
        #if serializer.is_valid():
         #   return serializer.save();

# we need update for PUT to work.
    def update(self, instance, validated_data):
        instance.attempted = validated_data.get('attempted')
        instance.passed = validated_data.get('passed')
        instance.save()
        return instance




