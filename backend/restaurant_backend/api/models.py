from django.db import models
CATEGORY_CHOICES = (
    ("veg", "Veg"),
    ("nonveg", "Non-Veg"),
    ("veg_snacks", "Veg Snacks"),
    ("nonveg_snacks", "Non-Veg Snacks"),
)


class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="food_images/", null=True, blank=True)
    category = models.CharField(max_length=20)


    def __str__(self):
        return self.name


class CartItem(models.Model):
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    session_id = models.CharField(max_length=100)


class Order(models.Model):
    items = models.JSONField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_mode = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default='pending')
