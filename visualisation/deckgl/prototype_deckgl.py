# deck.gl data visualisation prototype (à vol d'oiseau)
import pydeck as pdk
import pandas as pd

### Data import
data = {"path": [[[-73.628980, 45.486750], [-73.612941, 45.504738]]]} 
df = pd.DataFrame(data)

### Set background map
view_state = pdk.ViewState(latitude=45.497158, longitude=-73.621011, zoom=12) #Montreal coordinates

### Set the data layer
layer = pdk.Layer(
    type="PathLayer",
    data=df,
    pickable=True,
    get_color=[255,0,0],
    width_scale=20,
    width_min_pixels=2,
    get_path="path", #fetch the waypoints from the "path" column in df
    get_width=5,
)

### Generate and output the deck
r = pdk.Deck(layers=[layer], initial_view_state=view_state)
r.to_html("path_layer.html", open_browser=True)
