import { EdgeCommand } from '../../../lib/edge-command'
import { chooseChannel } from '../channels'


export default class ChannelsDeleteCommand extends EdgeCommand {
	static description = 'delete a channel'

	static flags = EdgeCommand.flags

	static args = [{
		name: 'id',
		description: 'channel id',
	}]

	async run(): Promise<void> {
		const { args, argv, flags } = this.parse(ChannelsDeleteCommand)
		await super.setup(args, argv, flags)

		const id = await chooseChannel(this, 'Choose a channel to delete.', args.id)
		await this.edgeClient.channels.delete(id)
		this.log(`Channel ${id} deleted.`)
	}
}
