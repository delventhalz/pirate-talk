from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction


class PirateHandler(TransactionHandler):
    @property
    def family_name(self):
        return 'pirate-talk'

    @property
    def family_versions(self):
        return ['0.0']

    @property
    def namespaces(self):
        return ['aaaaaa']

    def apply(self, txn, context):
        try:
            message = str(txn.payload)
        except Exception as e:
            raise InvalidTransaction(e)

        message = 'ya{} {}{}'.format(
            'r' * int(len(message) / 3),
            message,
            '!' * int(len(message) / 5))
        message.upper()

        uuid = txn.signature[-32:]
        address = 'aaaaaa' + ('0' * 32) + uuid

        context.set_state({address: message})
