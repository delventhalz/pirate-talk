from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction


def piratify(msg):
    return 'yar{} {}{}!'.format(
        'r' * int(len(msg) / 3),
        msg,
        '!' * int(len(msg) / 5)
    ).upper()

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
            message = txn.payload.decode('utf-8')
        except Exception as e:
            raise InvalidTransaction(e)

        pirate_message = piratify(message)
        uuid = txn.signature[-32:]
        address = 'aaaaaa' + ('a' * 32) + uuid

        print(pirate_message)
        context.set_state({address: pirate_message.encode('utf-8')})
