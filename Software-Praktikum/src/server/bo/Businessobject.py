from abc import ABC, abstractmethod;

class Businessobject(ABC):
  def __init__(self):
    self.id = 0;

  def get_id(self):
    return self.id;

  def set_id(self, value):
    self.id = value;
