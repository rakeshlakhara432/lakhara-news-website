import re

with open('src/app/pages/samaj/RegistrationPage.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx_start = text.find('{!memberCertData ? (') + len('{!memberCertData ? (')
idx_mid = text.find('          ) : (\n')

branch = text[idx_start:idx_mid].split('\n')

stack = []
for i, line in enumerate(branch):
    if '//' in line or '/*' in line or '*/' in line:
        continue
        
    for tag in re.findall(r'</?[a-zA-Z0-9]+[^>]*>', line):
        if tag.endswith('/>') or '<img' in tag or '<input' in tag or '<br' in tag or '<hr' in tag:
            continue
        is_close = tag.startswith('</')
        name_match = re.match(r'</?([a-zA-Z0-9]+)', tag)
        if not name_match: continue
        name = name_match.group(1)
        if name[0].isupper() or name in ['path', 'svg']: continue
        
        if not is_close:
            stack.append((name, i))
            print('  ' * (len(stack)-1) + f'{i}: <{name}>')
        else:
            if stack and stack[-1][0] == name:
                _, open_line = stack.pop()
                print('  ' * len(stack) + f'{i}: </{name}> (matches {open_line})')
            else:
                expected = stack[-1][0] if stack else "none"
                print('  ' * len(stack) + f'{i}: </{name}> (MISMATCH! expected {expected})')

print("UNCLOSED TAGS:")
for name, line in stack:
    print(f"<{name}> opened at line {line} within truthy branch")
