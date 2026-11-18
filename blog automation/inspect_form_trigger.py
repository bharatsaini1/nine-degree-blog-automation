with open(r'C:\Users\sankb\AppData\Roaming\npm\node_modules\n8n\node_modules\n8n-nodes-base\dist\nodes\Form\Form.node.js', 'r', encoding='utf-8') as f:
    code = f.read()

pos = code.find('completionProperties')
print(code[pos+500:pos+2500])
