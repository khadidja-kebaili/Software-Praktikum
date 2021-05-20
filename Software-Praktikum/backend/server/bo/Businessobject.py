from abc import ABC, abstractmethod


class BusinessObject(ABC):

    def __init__(self):
        self.id = 0

    def get_id(self):
        """Auslesen der ID."""
        return self.id

    def set_id(self, value):
        """Setzen der ID."""
        self.id = value
