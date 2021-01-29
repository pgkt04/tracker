from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

# Custom token that can be disabled manually
class CustomTokenAuthentication(TokenAuthentication):
    """
    Checks if the token is valid, if it isnt then we 
    raise an error so we can generate a new token
    """
    def authenticate():
        pass

    def authenticate_credentials(self, key):