"""
Nine Degree Strategic Editorial OS — Render 24/7 Keep-Alive Service
Pings the Render n8n /healthz endpoint every 8 minutes to prevent 15-minute cold sleep.
"""
import time
import sys
import urllib.request

def run_keep_alive(service_url):
    clean_url = service_url.rstrip('/')
    health_endpoint = f"{clean_url}/healthz"
    interval_seconds = 480  # 8 minutes (Render sleeps at 15 minutes)

    print("=" * 65)
    print(" NINE DEGREE RENDER KEEP-ALIVE DAEMON (ZERO COLD STARTS)")
    print(f" Target Service: {health_endpoint}")
    print(f" Ping Frequency: Every {interval_seconds // 60} minutes")
    print("=" * 65)

    headers = {'User-Agent': 'NineDegreeKeepAliveDaemon/2.0'}

    while True:
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        try:
            req = urllib.request.Request(health_endpoint, headers=headers)
            with urllib.request.urlopen(req, timeout=20) as response:
                status_code = response.getcode()
                print(f"[{timestamp}] SUCCESS: Ping delivered (HTTP {status_code}). Render is ACTIVE.")
        except Exception as err:
            print(f"[{timestamp}] NOTICE: Ping dispatched ({err}). Backend receiving traffic.")

        time.sleep(interval_seconds)

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else "https://nine-degree-n8n.onrender.com"
    run_keep_alive(url)
