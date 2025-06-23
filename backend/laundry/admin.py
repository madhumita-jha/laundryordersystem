from django.contrib import admin # type: ignore
from .models import LaundryOrder

@admin.register(LaundryOrder)
class LaundryOrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'pickup_date', 'frequency')
    search_fields = ('name', 'phone', 'pickup_date')
    list_filter = ('frequency', 'pickup_date')
