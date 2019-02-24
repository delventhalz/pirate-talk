import handler

CATEGORY_BUY_ORDERS = 0
CATEGORY_SELL_ORDERS = 1
CATEGORY_CRYPTO_TYPES = 4
CATEGORY_ISSUANCE = 5
CATEGORY_OWNERS = 6
CATEGORY_BONDS = 7
CATEGORY_OWNER_BONDS = 8
CATEGORY_OWNER_CRYPTOS = 9
CATEGORY_ORDERS = 10
CATEGORY_CLEARERS = 11
CATEGORY_OWNER_CRYPTO_PUBKEYS = 12

ADDRESS_LEGNTH = 70

def get_category_prefix(category):
    return handler.BondHandler.namespaces[0] + hex(category)[2:]

def add_category(method, category):
    def category_adder(*args, **kwargs):
        return get_category_prefix(category) + method(*args, **kwargs)
    return category_adder

def zero_pad(method):
    def padder(*args, **kwargs):
        address = method(*args, **kwargs)
        return '0' * (ADDRESS_LENGTH - 6 - len(address)) + address
    return padder

def prefixify(method, category):
    @add_category(category)
    @zero_pad
    def prefixer(*args, **kwargs):
        return method(*args, **kwargs)
    return prefixer

@prefixify(CATEGORY_BUY_ORDERS)
def get_buy_order_address(buy_asset_type_uuid, sell_asset_type_uuid):
    return buy_asset_type_uuid + sell_asset_type_uuid

@prefixify(CATEGORY_SELL_ORDERS)
def get_sell_order_address(sell_asset_type_uuid, buy_asset_type_uuid):
    return sell_asset_type_uuid + buy_asset_type_uuid

@prefixify(CATEGORY_ISSUANCE)
def get_issuance_address(issuance_uuid):
    return issuance_uuid

@prefixify(CATEGORY_BONDS)
def get_bond_address(bond_uuid):
    return bond_uuid

@prefixify(CATEGORY_OWNERS)
def get_owner_address(owner_pubkey):
    return owner_pubkey[:32]

@prefixify(CATEGORY_OWNER_BONDS)
def get_owner_bonds_address(owner_pubkey, issuance_uuid):
    return owner_pubkey[:32] + issuance_uuid

@prefixify(CATEGORY_OWNER_CRYPTOS)
def get_owner_cryptos_address(owner_pubkey, crypto_type_uuid):
    return owner_pubkey[:32] + crypto_uuid

@prefixify(CATEGORY_CRYPTO_TYPE)
def get_crypto_type_address(crypto_type_uuid):
    return crypto_type_uuid

@prefixify(CATEGORY_ORDERS)
def get_order_address(order_uuid):
    return order_uuid

@prefixify(CATEGORY_CLEARERS)
def get_clearer_address(clearer_pubkey):
    return clearer_pubkey[:32]

@prefixify(CATEGORY_OWNER_CRYPTO_PUBKEYS)
def get_owner_crypto_pubkeys_address(owner_pubkey, crypto_type_uuid):
    return owner_pubkey[:32] + crypto_type_uuid
