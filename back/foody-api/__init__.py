# from app import app
# from flask_cors import CORS

# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

## API Routes ##
from instagram_api.blueprints.users.views import users_api_blueprint
app.register_blueprint(users_api_blueprint, url_prefix='/users')

from instagram_api.blueprints.recipe.views import recipe_api_blueprint
app.register_blueprint(recipe_api_blueprint, url_prefix='/recipe')
