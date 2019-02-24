import handler

CATEGORY_BOND_BUY_ORDERS = 0
CATEGORY_BOND_SELL_ORDERS = 1
CATEGORY_CRYPTO_BUY_ORDERS = 2
CATEGORY_CRYPTO_SELL_ORDERS = 3
CATEGORY_CRYPTO_TYPES = 4
CATEGORY_BOND_TYPES = 5
CATEGORY_OWNERS = 6
CATEGORY_BONDS = 7
CATEGORY_OWNER_BONDS = 8
CATEGORY_OWNER_CRYPTOS = 9
CATEGORY_ORDERS = 10
CATEGORY_CLEARERS = 11
CATEGORY_OWNER_CRYPTO_PUBKEYS = 12

ADDRESS_LEGNTH = 70

def add_namespace(method):
    def namespace_adder(*args, **kwargs):
        return handler.BondHandler.namespaces[0] + method(*args, **kwargs)
    return namespace_adder

def add_category(method, category):
    def category_adder(*args, **kwargs):
        return hex(CATEGORY_BOND_TYPES)[2:] + method(*args, **kwargs)
    return category_adder

def zero_pad(method):
    def padder(*args, **kwargs):
        address = method(*args, **kwargs)
        return '0' * (ADDRESS_LENGTH - 6 - len(address)) + address
    return padder

def prefixify(method, category):
    @add_namespace
    @add_category(category)
    @zero_pad
    def prefixer(*args, **kwargs):
        return method(*args, **kwargs)
    return prefixer

@prefixify(CATEGORY_BOND_TYPES)
def get_bond_type_address(uuid):
    return uuid

@prefixify(CATEGORY_BONDS)
def get_bond_address(uuid):
    return uuid

@prefixify(CATEGORY_OWNERS)
def get_owner_address(pubkey):
    # TODO pubkey is probably a different format
    return hex(pubkey)[:32][2:]