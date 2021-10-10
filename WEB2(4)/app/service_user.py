import sqlite3

from repo_users import RepoUs


class Service(object):

    def __init__(self):
        self.repo = RepoUs()

    def validation(self, username, password):
        for obj in self.repo.list_users:
            if username == obj.login and password == obj.password:
                return obj
        return None

    def users_logins(self):
        list_logins = []
        self.repo.select_users()
        for obj in self.repo.list_users:
            list_logins.append(obj.login)
        return list_logins

    def users_logins_per(self):
        self.repo.select_users()
        self.repo.obj_to_dict()
        ld = []
        for l in self.repo.data_users['entities']:
            dl = {}
            dl.update({"login": l['login'], "permission": l['permission']})
            ld.append(dl)
        return ld

    def find_user(self, login):
        usernow = object
        for l in self.repo.list_users:
            if l.login == login:
                usernow = l
        return usernow

    def checked_users(self, users, col):
        list_logins = users.split(',')
        list_col = col.split(',')
        new_list = []
        for obj in self.repo.list_users:
            if obj.login in list_logins:
                temp_list = {}
                for l in list_col:
                    temp_list.update({l: obj.__dict__[l]})
                new_list.append(temp_list)
        return new_list
