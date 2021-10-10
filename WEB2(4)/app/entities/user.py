class User(object):

    def __init__(self, id_user, login, nickname, firstname, lastname, password, age, permission):
        self.login = login
        self.nickname = nickname
        self.age = age
        self.id_user = id_user
        self.lastname = lastname
        self.firstname = firstname
        self.password = password
        self.permission = permission

    def get_login_and_mickname(self):
        return "%s (%s)" % (self.login, self.nickname)

    def get_login(self):
        return self.login

    def set_login(self, login):
        self.login = login

    def get_firstname(self):
        return self.firstname

    def set_firstname(self, firstname):
        self.firstname = firstname
