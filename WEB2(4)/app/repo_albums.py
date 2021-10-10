import os
import sqlite3

from entities.album import Album
from entities.band import Band


class RepoAl(object):
    list_albums = []
    list_bands = []
    list_albums_basket = []
    list_album_lib = []
    data_albums = {'length': '', 'entities': []}
    data_basket = {'length': '', 'entities': []}
    data_album_lib = {'length': '', 'entities': []}

    def __init__(self):
        self.select_albums()
        self.obj_to_dict()
        self.select_bands()

    def add_album(self, id_album, name_album, a_date, price, band):
        self.list_albums.append(Album(id_album, name_album, a_date, price, band))

    def add_band(self, id_band, name_band):
        self.list_bands.append(Band(id_band, name_band))

    def get_connect(self):
        p = '/home/julie47/JUST_DO/python/WEB2(4)/app/data/app.db'
        return sqlite3.connect(p)

    def select_albums(self):
        self.list_albums = []
        conn = self.get_connect()
        c = conn.cursor()
        c.execute('''SELECT id_album, name_album, a_date, price, name_band  FROM albums INNER JOIN
         bands ON bands.id_band = albums.id_band;''')
        rows = c.fetchall()
        for row in rows:
            self.add_album(row[0], row[1], row[2], row[3], row[4])
        conn.commit()
        conn.close()

    def select_bands(self):
        self.list_bands = []
        conn = self.get_connect()
        c = conn.cursor()
        c.execute('''SELECT id_band, name_band FROM bands ;''')
        rows = c.fetchall()
        for row in rows:
            self.add_band(row[0], row[1])
        conn.commit()
        conn.close()

    def select_name_bands(self):
        list_b = []
        for obj in self.list_bands:
            list_b.append(obj.name_band)
        return list_b

    def select_library(self, id_user):
        self.list_album_lib = []
        conn = self.get_connect()
        c = conn.cursor()
        li_id = []
        c.execute("SELECT id_album FROM user_albums WHERE id_user = ? ", (id_user,))
        conn.commit()
        rows = c.fetchall()
        for row in rows:
            li_id.append(row[0])
        for n in li_id:
            print(n)
            c.execute("SELECT id_album, name_album, a_date, price, name_band  FROM albums INNER JOIN \
            bands ON bands.id_band = albums.id_band WHERE id_album=" + str(n) + ";")
            rows = c.fetchall()
            for row in rows:
                self.list_album_lib.append(Album(row[0], row[1], row[2], row[3], row[4]))
        conn.commit()
        conn.close()

    def delete_band(self, band):
        conn = self.get_connect()
        c = conn.cursor()
        band = band.split(',')
        for u in band:
            c.execute('''SELECT id_user_album FROM user_albums INNER JOIN albums on user_albums.id_album = albums.id_album INNER
            JOIN bands on bands.id_band = albums.id_band WHERE name_band = ?''', (u,))
            rows = c.fetchall()
            for row in rows:
                c.execute("DELETE FROM \"user_albums\" WHERE id_user_album=?;", row)
            c.execute('''SELECT id_album FROM albums INNER JOIN bands on bands.id_band = albums.id_band WHERE 
            name_band = ?''', (u,))
            rows = c.fetchall()
            for row in rows:
                c.execute("DELETE FROM \"albums\" WHERE id_album=?;", row)
            c.execute("DELETE FROM bands WHERE name_band=\"" + u + "\";")
        conn.commit()
        conn.close()
        return 'true'

    def delete_albums(self, albums):
        conn = self.get_connect()
        c = conn.cursor()
        albums = albums.split(',')
        for u in albums:
            # print(u)
            # print(self.find_id_album(u))
            c.execute('''SELECT id_user_album FROM user_albums INNER JOIN albums on user_albums.id_album = 
            albums.id_album  WHERE name_album = ?''', (u,))
            rows = c.fetchall()
            for row in rows:
                print(row)
                c.execute("DELETE FROM \"user_albums\" WHERE id_user_album=?;", row)
            c.execute("DELETE FROM \"albums\" WHERE name_album=\"" + u + "\";")
        conn.commit()
        conn.close()
        return 'true'

    def save_band(self, band):
        if band != "":
            conn = self.get_connect()
            c = conn.cursor()
            sql = ''' INSERT INTO bands (id_band, name_band) VALUES(null, ?) '''
            c.execute(sql, (band,))
            conn.commit()
            conn.close()
            self.refresh()
            return "Data saved"
        else:
            return 'Invalid! Empty fields'

    def save_alb(self, band, name_alb, date, price):
        price = int(price)
        if name_alb != "" and date != "" and price != "" and band != "":
            id_band = self.find_id_band(band)
            conn = self.get_connect()
            c = conn.cursor()
            sql = ''' INSERT INTO albums(name_album, a_date, price, id_band)
                                                 VALUES(?, ?, ?, ?) '''
            task = (name_alb, date, int(price), id_band)
            c.execute(sql, task)
            conn.commit()
            conn.close()
            self.refresh()
            return "Data saved"
        else:
            return 'Invalid! Empty fields'

    def save_buy_basket(self, li_basket, id_user):
        # li_basket = li_basket.split(',')
        for n in self.list_albums_basket:
            conn = self.get_connect()
            c = conn.cursor()
            sql = ''' INSERT INTO user_albums(id_user_album, id_user, id_album)
                                                            VALUES(null, ?, ?) '''
            task = (id_user, n.id_album)
            c.execute(sql, task)
            conn.commit()
            conn.close()
        return "Data saved"

    def find_id_album(self, name_a: str) -> list:
        for obj in self.list_albums:
            if obj.name_album == name_a:
                return obj.id_album

    def find_id_album_by_id_band(self, name_band):
        for obj in self.list_albums:
            print(obj.band, name_band)
            if obj.band == name_band:
                return obj.id_album

    def find_id_band(self, band):
        for obj in self.list_bands:
            if obj.name_band == band:
                return obj.id_band
        return None

    def find_alb(self, name_a):
        list_img = ['Absolution', 'AM', 'Blood-Sugar-Sex', 'Clean-Town', 'Creep', 'Give-Me-Fire', 'Good-Song',
                    'Good-Times', 'Never-Seen-Light-Of-Day', 'Nevermind', 'Only-By-The-Night', 'The-Kings-Of-Limbs',
                    'Tranquality-Base']
        return list(filter(lambda x: x == name_a, list_img))

    def get_alb_img(self, name):
        path = os.path.abspath(os.getcwd())
        path += '/data/albums_pictures/'
        return path + 'music.jpeg' if len(self.find_alb(name)) == 0 else path + name + '.jpeg'

    def find_bask(self, name_a):
        for obj in self.list_albums_basket:
            if name_a == obj.name_album:
                return True
        return False

    def delete_basket(self, name_a):
        for n in name_a:
            for obj in self.list_albums_basket:
                if obj.name_album == n:
                    self.list_albums_basket.remove(obj)

    def add_alb_bask(self, name_a):
        if not self.find_bask(name_a):
            for obj in self.list_albums:
                if name_a == obj.name_album:
                    self.list_albums_basket.append(obj)
                    self.obj_to_dict_bask()

    def refresh(self):
        self.select_albums()
        self.obj_to_dict()
        self.select_bands()

    def obj_to_dict_lib(self):
        self.data_album_lib['length'] = len(self.list_album_lib)
        self.data_album_lib['entities'] = []
        for obj in self.list_album_lib:
            self.data_album_lib['entities'].append(obj.__dict__)

    def obj_to_dict_bask(self):
        self.data_basket['length'] = len(self.list_albums_basket)
        self.data_basket['entities'] = []
        for obj in self.list_albums_basket:
            self.data_basket['entities'].append(obj.__dict__)

    def obj_to_dict(self):
        self.data_albums['length'] = len(self.list_albums)
        self.data_albums['entities'] = []
        for obj in self.list_albums:
            self.data_albums['entities'].append(obj.__dict__)
