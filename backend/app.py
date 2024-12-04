from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Local paths to your CSV files
NBA_CSV_PATH = './nba_mvp_predictions.csv'  # Path to your MVP predictions CSV
PLAYERS_CSV_PATH = './players.csv'  # Path to the players CSV
IMAGES_FOLDER = './images/'  # Folder containing player images

# Function to read CSV
def get_data_from_csv(file_path):
    return pd.read_csv(file_path)

@app.route('/api/mvp')
def get_mvp_data():
    try:
        # Load the MVP data from local CSV file
        df = get_data_from_csv(NBA_CSV_PATH)

        # Load the players' additional information from local CSV
        players_info_df = get_data_from_csv(PLAYERS_CSV_PATH)

        # Split the 'Player' column into 'fname' and 'lname' for the top 3 MVP players
        top_3_mvp = df.head(3)  # Top 3 MVP candidates
        top_3_mvp[['fname', 'lname']] = top_3_mvp['Player'].str.split(' ', n=1, expand=True)

        # Ensure 'fname' and 'lname' are treated as strings
        top_3_mvp['fname'] = top_3_mvp['fname'].astype(str)
        top_3_mvp['lname'] = top_3_mvp['lname'].astype(str)

        # Merge with players_info_df to get additional player details
        top_3_mvp_with_info = top_3_mvp.merge(players_info_df[['playerid', 'fname', 'lname']], on=['fname', 'lname'], how='inner')

        # Prepare data for the top 3 MVP candidates
        top_3_mvp_data = []
        for _, row in top_3_mvp_with_info.iterrows():
            player_data = {
                'player_name': f"{row['fname']} {row['lname']}",
                'points': row['PTS'],
                'assists': row['AST'],
                'steals': row['STL'],
                'blocks': row['BLK'],
                'rebounds': row['TRB'],
                'minutes_played': row['MP'],
                'win_loss_percentage': row['W/L%'],
                'player_id': row['playerid'],
                'image_url': f"{IMAGES_FOLDER}{row['playerid']}.png"  # Path to local images
            }
            top_3_mvp_data.append(player_data)

        # Prepare data for the next top 7 MVP candidates (ranked 4th to 10th)
        top_10_mvp = df.iloc[3:10]  # Top 10 MVP candidates (from 4th to 10th)
        top_10_mvp[['fname', 'lname']] = top_10_mvp['Player'].str.split(' ', n=1, expand=True)

        # Ensure 'fname' and 'lname' are treated as strings for top 10 players
        top_10_mvp['fname'] = top_10_mvp['fname'].astype(str)
        top_10_mvp['lname'] = top_10_mvp['lname'].astype(str)

        top_10_mvp_with_info = top_10_mvp.merge(players_info_df[['playerid', 'fname', 'lname']], on=['fname', 'lname'], how='inner')

        top_10_mvp_data = []
        for _, row in top_10_mvp_with_info.iterrows():
            player_data = {
                'player_name': f"{row['fname']} {row['lname']}",
                'points': row['PTS'],
                'assists': row['AST'],
                'steals': row['STL'],
                'blocks': row['BLK'],
                'rebounds': row['TRB'],
                'minutes_played': row['MP'],
                'win_loss_percentage': row['W/L%'],
                'player_id': row['playerid'],
                'image_url': f"{IMAGES_FOLDER}{row['playerid']}.png"  # Path to local images
            }
            top_10_mvp_data.append(player_data)

        # Return the data as a JSON response
        return jsonify({
            'top_3_mvp': top_3_mvp_data,
            'top_10_mvp': top_10_mvp_data
        })

    except Exception as e:
        return jsonify({'error': f"Error Received: {e}\n"})


if __name__ == '__main__':
    app.run(debug=True)
