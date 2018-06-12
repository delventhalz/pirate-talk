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
        print('Hello {}!'.format(txn.header.signerPublicKey))
