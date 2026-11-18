import sqlite3
import os

db_path = os.path.expanduser('~/.n8n/database.sqlite')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("UPDATE workflow_entity SET active = 1 WHERE id IN ('ND9DegreeBlog01', 'NDEditorialIntel01')")
conn.commit()
print("Updated rows:", c.rowcount)

c.execute("SELECT id, name, active FROM workflow_entity WHERE id IN ('ND9DegreeBlog01', 'NDEditorialIntel01')")
for r in c.fetchall():
    print(r)
