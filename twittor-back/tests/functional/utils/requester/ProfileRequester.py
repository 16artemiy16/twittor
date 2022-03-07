
from . import Requester


class ProfileRequester(Requester):
    def get_profile(self, login=''):
        url = f'/profile/{login}'
        headers = {'Authorization': f'Bearer {self.token}'} if self.token else {}
        return self.client.get(
            url,
            headers=headers,
        )

    def search_users(self, query):
        url = f'/search-users/?query={query}'
        print('url', url)
        return self.client.get(url)
