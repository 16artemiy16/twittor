class Requester:
    """
    Each specific requester should inherit this superclass.
    """
    def __init__(self, client):
        self.client = client
