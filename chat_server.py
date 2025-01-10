import asyncio
import websockets

# Store connected clients
connected_clients = set()

async def handle_client(websocket, path):
    # Register client
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Broadcast the received message to all connected clients
            for client in connected_clients:
                if client != websocket:
                    await client.send(message)
    finally:
        # Unregister client
        connected_clients.remove(websocket)

async def main():
    async with websockets.serve(handle_client, "localhost", 6789):
        print("Server started at ws://localhost:6789")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
