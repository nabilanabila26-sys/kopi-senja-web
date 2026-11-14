"""
Local Development & Preview Server for Kopi Senja Web App
Runs on Python 3 with zero external dependencies.
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[Kopi Senja Server] {self.address_string()} - {format%args}\n")

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("☕ KOPI SENJA - LOCAL WEB APP SERVER")
        print("=" * 60)
        print(f"🚀 Server aktif di: {url}")
        print(f"📂 Direktori: {DIRECTORY}")
        print("💡 Tekan Ctrl+C untuk menghentikan server.")
        print("=" * 60)
        
        # Try to open in default browser
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server dihentikan. Selamat menikmati Kopi Senja!")

if __name__ == "__main__":
    run()
