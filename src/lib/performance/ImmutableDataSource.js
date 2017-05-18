/**
 * Created by yoyo on 16/6/25.
 */
import {ListView} from 'react-native'
import immutable from 'immutable'

export default class ImmutableDataSource extends ListView.DataSource {
	constructor() {
		super({rowHasChanged: immutable.is})
	}

	cloneWithRows(immutableRows) {
		return super.cloneWithRows(immutableRows.toArray())
	}
}
