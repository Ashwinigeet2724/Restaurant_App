from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from .models import FoodItem, CartItem, Order
from .serializers import FoodSerializer, CartSerializer


# =========================
# FOOD ITEMS API
# =========================
@api_view(['GET'])
def food_items(request):
    category = request.GET.get('category')

    if category:
        items = FoodItem.objects.filter(category=category)
    else:
        items = FoodItem.objects.all()

    serializer = FoodSerializer(items, many=True, context={'request': request})
    return Response(serializer.data)


# =========================
# ADD / UPDATE CART (+ / -)
# =========================
@api_view(['POST'])
@csrf_exempt
def add_cart(request):
    try:
        if not request.session.session_key:
            request.session.create()

        session_id = request.session.session_key
        food_id = request.data.get('food_id')
        change = int(request.data.get('quantity', 1))

        food = FoodItem.objects.get(id=food_id)

        cart_item, created = CartItem.objects.get_or_create(
            food_item=food,
            session_id=session_id
        )

        if created:
            cart_item.quantity = change
        else:
            cart_item.quantity += change

        cart_item.save()
        return Response({"status": "ok"})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# =========================
# CART LIST
# =========================

@api_view(["GET", "POST"])
def cart(request):
    if not request.session.session_key:
        request.session.create()

    session_id = request.session.session_key

    if request.method == "GET":
        cart_items = CartItem.objects.filter(session_id=session_id)

        serializer = CartSerializer(
            cart_items,
            many=True,
            context={"request": request}   # ✅ THIS LINE FIXES IMAGES
        )

        return Response(serializer.data)

    if request.method == "POST":
        food_id = request.data.get("food_id")
        quantity = int(request.data.get("quantity"))

        try:
            cart_item = CartItem.objects.get(
                food_item_id=food_id,
                session_id=session_id
            )

            if quantity <= 0:
                cart_item.delete()
            else:
                cart_item.quantity = quantity
                cart_item.save()

            return Response({"message": "Cart updated"})

        except CartItem.DoesNotExist:
            return Response(
                {"error": "Item not found"},
                status=status.HTTP_404_NOT_FOUND
            )


# =========================
# CREATE ORDER
# =========================
@api_view(['POST'])
def create_order(request):
    Order.objects.create(
        items=request.data.get('items'),
        total_price=request.data.get('total_price'),
        payment_mode=request.data.get('payment_mode')
    )

    # Clear cart after order
    if request.session.session_key:
        CartItem.objects.filter(session_id=request.session.session_key).delete()

    return Response({"status": "order placed"}, status=status.HTTP_201_CREATED)


# =========================
# CLEAR CART
# =========================
@api_view(["POST"])
def clear_cart(request):
    if not request.session.session_key:
        request.session.create()

    session_id = request.session.session_key
    CartItem.objects.filter(session_id=session_id).delete()
    return Response({"message": "Cart cleared"})


# =========================
# REMOVE FROM CART
# =========================
@api_view(['POST'])
def remove_from_cart(request):
    if not request.session.session_key:
        request.session.create()

    session_id = request.session.session_key
    food_id = request.data.get('food_id')

    if not food_id:
        return Response({"error": "food_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    CartItem.objects.filter(
        food_item_id=food_id,
        session_id=session_id
    ).delete()

    return Response({"message": "Item removed from cart"})
