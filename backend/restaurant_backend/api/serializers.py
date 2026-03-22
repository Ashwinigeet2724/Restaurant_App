from rest_framework import serializers
from .models import FoodItem, CartItem


class FoodSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = FoodItem
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None



class CartSerializer(serializers.ModelSerializer):
    food_item = FoodSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "food_item", "quantity"]
