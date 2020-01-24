import logging

from django.db.models.signals import post_save
from django.dispatch import receiver
from attendiApp.models import Statistic

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Statistic)
def exec(sender, **kwargs):
    # nothing here
    logger.error('Something went wrong!')
