import sqlite3
import os
import json

db_path = os.path.expanduser('~/.n8n/database.sqlite')
conn = sqlite3.connect(db_path)
c = conn.cursor()

def unflatten(data):
    def revive(index, seen):
        if index in seen:
            return seen[index]
        val = data[index]
        if isinstance(val, dict):
            res = {}
            seen[index] = res
            for k, v in val.items():
                if isinstance(v, str) and v.isdigit() and int(v) < len(data):
                    res[k] = revive(int(v), seen)
                else:
                    res[k] = v
            return res
        elif isinstance(val, list):
            res = []
            seen[index] = res
            for item in val:
                if isinstance(item, str) and item.isdigit() and int(item) < len(data):
                    res.append(revive(int(item), seen))
                else:
                    res.append(item)
            return res
        else:
            return val
    return revive(0, {})

c.execute("SELECT data FROM execution_data WHERE executionId = 23")
row = c.fetchone()
if row and row[0]:
    root = unflatten(json.loads(row[0]))
    runData = root['resultData']['runData']
    print('Nodes executed in #23:', list(runData.keys()))
    for node in runData:
        if 'Delivery' in node or 'Assembly' in node:
            out = runData[node][0]['data']['main'][0][0]['json']
            print('Assembly output keys:', list(out.keys()))
            if 'audit_report' in out:
                print('Audit report in #23:', out['audit_report'])
            if 'htmlResponse' in out:
                with open(r'D:\n8n workflows\output\execution_23_output.html', 'w', encoding='utf-8') as f:
                    f.write(out['htmlResponse'])
                print('Saved execution_23_output.html (length:', len(out['htmlResponse']), ')')
            if 'markdown' in out:
                with open(r'D:\n8n workflows\output\execution_23_output.md', 'w', encoding='utf-8') as f:
                    f.write(out['markdown'])
                print('Saved execution_23_output.md')
