import sqlite3

from entities.user import User


class RepoUs(object):
    list_users = []
    data_users = {'length': '', 'entities': []}

    def __init__(self):
        self.select_users()
        self.obj_to_dict()

    def add_user(self, id_user, login, nickname, firstname, lastname, password, age, permission):
        self.list_users.append(User(id_user, login, nickname, firstname, lastname, password, age, permission))

    def get_connect(self):
        p = '/home/julie47/JUST_DO/python/WEB2(4)/app/data/app.db'
        return sqlite3.connect(p)

    def select_users(self):
        self.list_users = []
        conn = self.get_connect()
        c = conn.cursor()
        c.execute('''SELECT id_user, login, nickname, firstname, lastname, password, age, name FROM users INNER JOIN
         permissions ON permissions.id_permission = users.id_permission;''')
        rows = c.fetchall()
        for row in rows:
            self.add_user(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])
        conn.commit()
        conn.close()

    def obj_to_dict(self):
        self.data_users['length'] = len(self.data_users)
        self.data_users['entities'] = []
        for obj in self.list_users:
            self.data_users['entities'].append(obj.__dict__)

    def delete_users(self, users):
        conn = self.get_connect()
        c = conn.cursor()
        users = users.split(',')
        for u in users:
            c.execute("DELETE FROM \"users\" WHERE login=\"" + u + "\";")
            conn.commit()
            c.execute("DELETE FROM \"user_albums\" WHERE id_user=\"" + str(self.find_id_user(u)) + "\";")
            conn.commit()
        conn.close()
        return 'true'

    def create_user(self, firstname, lastname, permission, age, password, login, nickname):
        if self.find_login(login) is True:
            return "Login is not avaliable"
        if permission != "admin" and permission != "user" and permission != "servicer":
            return "Permission invalid"
        id_permission = self.find_id_per(permission)
        if firstname != "" and lastname != "" and id_permission != "" and age != "" and password != "" and login != "" and nickname != "":
            conn = self.get_connect()
            c = conn.cursor()
            sql = ''' INSERT INTO users(firstname, lastname, id_permission, age, password, login, nickname)
                               VALUES(?,?,?,?,?,?,?) '''
            task = (firstname, lastname, id_permission, age, password, login, nickname)
            c.execute(sql, task)
            conn.commit()
            conn.close()
            return "Data saved"
        else:
            return 'Invalid empty fields'

    def find_login(self, login):
        for obj in self.list_users:
            if obj.login == login:
                return True
        return False

    def find_id_user(self, login):
        for obj in self.list_users:
            if obj.login == login:
                return obj.id_user

    def find_id_per(self, permission):
        if permission == "admin":
            return "101"
        elif permission == "user":
            return "103"
        else:
            return "102"

    def find_nick_log(self, nickname, login):
        for obj in self.list_users:
            if login == obj.login and nickname == obj.nickname:
                return True
        return False

    def edit_user(self, firstname, lastname, permission, age, password, login, nickname):
        if self.find_nick_log(nickname, login):
            if permission != "admin" and permission != "user" and permission != "servicer":
                return "Permission invalid"
            id_permission = self.find_id_per(permission)
            if firstname != "" and lastname != "" and age != "" and password != "":
                conn = self.get_connect()
                c = conn.cursor()
                sql = ''' UPDATE users SET firstname = ?, lastname = ?, id_permission = ?, age = ?, 
                    password = ? WHERE login = ''' + '\"' + login + "\";"
                task = (firstname, lastname, id_permission, age, password)
                c.execute(sql, task)
                conn.commit()
                conn.close()
                return "Data saved"
            else:
                return 'Invalid empty fields'
        else:
            return 'You dont change nickname or login'
