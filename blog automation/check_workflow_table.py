import sqlite3
import os

db_path = os.path.expanduser('~/.n8n/database.sqlite')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("PRAGMA table_info(user_api_keys)")
print('Columns:', [x[1] for x in c.fetchall()])
c.execute("SELECT * FROM user_api_keys")
print('API Keys:', c.fetchall())
