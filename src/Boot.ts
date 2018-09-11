import { Server, Socket, AddressInfo } from 'net'
import { hexId, print } from './tools'

export class Boot {

  private peers = []

  constructor(
    public account = hexId(),
    private service = new Server()) { }

  async run(port = 60030) {
    print(`Boot`, `${this.account}`, port)

    this.service
      .on('data', this.onData.bind(this))
      .on('error', this.onError.bind(this))
      .on('listening', this.onListening.bind(this))
      .on('connection', this.onConnection.bind(this))
      .on('disconnected', () => console.log('disconnected'))

    this.service.listen(port)
  }

  private onError(error: Error) {
    const info = <AddressInfo>this.service.address()
    print(`Boot`, info.address, info.port, `Error`, error.message)
    //this.service.close()
  }

  private onData(socket: Socket) {
    const { remoteAddress, remotePort } = socket
    print(`Peer`, remoteAddress, remotePort, `Transmiting`)
  }

  private onConnection(socket: Socket) {
    const { remoteAddress, remotePort } = socket
    print(`Peer`, remoteAddress, remotePort, `Connected`)
    setInterval(() => this.heartbit(socket), 1000)
  }

  private onListening(socket: Socket) {
    const info = <AddressInfo>this.service.address()
    print(`Boot`, info.address, info.port, `Up`)
    this.peers.push(info.port)
  }

  private heartbit(socket: Socket) {
    if (socket.destroyed) return;

    socket.write(Buffer.from(JSON.stringify({
      peer: hexId(),
      ts: new Date().getTime()
    })))
  }

}
