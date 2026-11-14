"""
Build Standalone Single-File Distribution of Kopi Senja Web App
Combines styles, data, icons, and application code into one single file (index-standalone.html)
allowing it to run directly via double-click (file:// protocol) in Chrome, Edge, Opera, etc.
without any CORS restrictions!
"""
import os

DIR = os.path.dirname(os.path.abspath(__file__))

def build():
    with open(os.path.join(DIR, "data.js"), "r", encoding="utf-8") as f:
        data_js = f.read()
    
    with open(os.path.join(DIR, "icons.js"), "r", encoding="utf-8") as f:
        icons_js = f.read()
        
    with open(os.path.join(DIR, "app.js"), "r", encoding="utf-8") as f:
        app_js = f.read()

    with open(os.path.join(DIR, "styles.css"), "r", encoding="utf-8") as f:
        styles_css = f.read()

    with open(os.path.join(DIR, "index.html"), "r", encoding="utf-8") as f:
        index_html = f.read()

    # Replace external styles and scripts with inlined versions
    standalone = index_html
    standalone = standalone.replace(
        '<link rel="stylesheet" href="styles.css">',
        f'<style>\n{styles_css}\n</style>'
    )
    
    script_block = f"""
  <!-- Inlined Cafe Data -->
  <script>
{data_js}
  </script>

  <!-- Inlined Lucide SVG Icons -->
  <script>
{icons_js}
  </script>

  <!-- Inlined Main Application Script (Works directly via file://) -->
  <script type="text/babel">
{app_js}
  </script>
"""
    
    target_block = """  <!-- Cafe Data Source -->
  <script src="data.js"></script>

  <!-- Lucide SVG Icons -->
  <script src="icons.js"></script>

  <!-- Main Application Script (Transpiled by Babel) -->
  <script type="text/babel" src="app.js"></script>"""

    standalone = standalone.replace(target_block, script_block)

    out_path = os.path.join(DIR, "index-standalone.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(standalone)

    print(f"✓ Standalone file successfully generated: {out_path} ({len(standalone)} bytes)")

if __name__ == "__main__":
    build()
