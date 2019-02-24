from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction


class BondHandler(TransactionHandler):
    @property
    def family_name(self):
        return 'crypto-bonds'

    @property
    def family_versions(self):
        return ['0.0']

    @property
    def namespaces(self):
        return ['b04d']  # Thanks @Zac Delventhal

    def apply(self, txn, context):
        try:
            message = txn.payload.decode('utf-8')
        except Exception as e:
            raise InvalidTransaction(e)

        if method == 'issue_bond':
            actions = issue_bonds(relevant_info)

        method(context, initiator_pubkey, message_dict)

        address = 'aaaaaa' + ('a' * 32) + uuid

        context.set_state({address: pirate_message.encode('utf-8')})
