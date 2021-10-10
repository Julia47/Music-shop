from flask import (Flask, request, render_template, session, jsonify, send_file)

from repo_albums import RepoAl
from repo_users import RepoUs
from service_user import Service

app = Flask(__name__)
app.secret_key = "abc"

# per = ""
# p = ""

repo_us = RepoUs()
repo_alb = RepoAl()
service = Service()


@app.route('/', methods=['GET', 'POST'])
def login():
    return render_template("login.html")


@app.route('/index', methods=['GET', 'POST'])
def index():
    login = request.args.get('login')
    return render_template("menu.html", name=session['user']['login'], per=session['user']['permission'])


@app.route('/edit', methods=['GET', 'POST'])
def edit():
    login = request.args.get('user')
    return render_template("edit.html", usernow=service.find_user(login))


@app.route('/library', methods=['GET', 'POST'])
def library():
    return render_template("library.html", name=session['user']['login'])


@app.route('/buy_album')
def buy_album():
    album = request.args.get('name_album')
    repo_alb.add_alb_bask(album)
    repo_alb.obj_to_dict_bask()
    return render_template("basket.html", name=session['user']['login'])


# service requists


@app.route('/library_album', methods=['GET', 'POST'])
def library_album():
    repo_alb.select_library(session['user']['id_user'])
    repo_alb.obj_to_dict_lib()
    return jsonify(repo_alb.data_album_lib['entities'])


@app.route('/library_album_servicer', methods=['GET', 'POST'])
def library_album_servicer():
    n_usr = request.args.get('user')
    repo_alb.select_library(repo_us.find_id_user(n_usr))
    repo_alb.obj_to_dict_lib()
    return jsonify(repo_alb.data_album_lib['entities'])


@app.route('/basket_album', methods=['GET', 'POST'])
def basket_album():
    return jsonify(repo_alb.data_basket['entities'])


@app.route('/empty_basket', methods=['GET', 'POST'])
def empty_basket():
    repo_alb.list_albums_basket = []
    repo_alb.data_basket = {'length': '', 'entities': []}
    return 'True'


@app.route('/pictures/<name>')
def get_pictures(name):
    path = repo_alb.get_alb_img(name)
    return send_file(path, mimetype='image/jpeg')


@app.route('/all_albums')
def all_albums():
    return jsonify(repo_alb.data_albums['entities'])


@app.route('/js_login', methods=['GET'])
def js_login():
    login = request.args.get('login')
    password = request.args.get('password')
    if service.validation(login, password) is None:
        return 'false'
    else:
        session['user'] = service.validation(login, password).__dict__
        return 'true'


@app.route('/edit_user', methods=['GET'])
def edit_user():
    return repo_us.edit_user(request.args.get('firstname'), request.args.get('lastname'),
                             request.args.get('permission'), request.args.get('age'),
                             request.args.get('password'), request.args.get('login'),
                             request.args.get('nickname'))


@app.route('/create_user', methods=['GET'])
def create_user():
    return repo_us.create_user(request.args.get('firstname'), request.args.get('lastname'),
                               request.args.get('permission'),
                               request.args.get('age'), request.args.get('password'),
                               request.args.get('login'), request.args.get('nickname'))


@app.route('/save_band', methods=['GET'])
def save_band():
    return repo_alb.save_band(request.args.get('band'))


@app.route('/save_alb', methods=['GET'])
def save_alb():
    return repo_alb.save_alb(request.args.get('band'), request.args.get('name_album'),
                             request.args.get('date'), request.args.get('price'))


@app.route('/save_buy_basket', methods=['GET'])
def save_buy_baskeet():
    # return jsonify(session['user']['id_user'])
    return repo_alb.save_buy_basket(request.args.get('basket'), session['user']['id_user'])


@app.route('/checked_users', methods=['GET'])
def checked_users():
    users = request.args.get('users')
    col = request.args.get('col')
    return jsonify(service.checked_users(users, col))


@app.route('/checked_delete_basket', methods=['GET'])
def checked_basket_delete():
    basket = request.args.get('alb')
    return repo_alb.delete_basket(basket)


@app.route('/checked_delete_user', methods=['GET'])
def checked_users_delete():
    users = request.args.get('user')
    return repo_us.delete_users(users)


@app.route('/checked_delete_alb', methods=['GET'])
def checked_alb_delete():
    repo_alb.refresh()
    alb = request.args.get('alb')
    return repo_alb.delete_albums(alb)


@app.route('/checked_delete_band', methods=['GET'])
def checked_band_delete():
    repo_alb.refresh()
    band = request.args.get('band')
    return repo_alb.delete_band(band)


@app.route('/select_bands')
def select_bands():
    return jsonify(repo_alb.select_name_bands())


@app.route('/session_user')
def session_user():
    return session['user']['permission']


@app.route('/session_user_login')
def session_user_login():
    return session['user']['login']


@app.route('/users_logins_per')
def users_logins_per():
    repo_alb.refresh()
    return jsonify(service.users_logins_per())


@app.route('/users_logins')
def users_logins():
    repo_alb.refresh()
    return jsonify(service.users_logins())


if __name__ == "__main__":
    app.run(debug=True)
