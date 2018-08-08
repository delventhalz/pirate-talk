import sys
import argparse

from sawtooth_sdk.processor.core import TransactionProcessor
from pirate_processor.handler import PirateHandler


def parse_args(args):
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawTextHelpFormatter)

    parser.add_argument(
        '-C', '--connect',
        default='tcp://localhost:4004',
        help='Endpoint for the validator connection')

    return parser.parse_args(args)


def main():
    opts = parse_args(sys.argv[1:])
    processor = None

    try:
        processor = TransactionProcessor(url=opts.connect)

        handler = PirateHandler()
        processor.add_handler(handler)

        print('YARRRR READY TO TALK LIKE A PIRATE!!!')
        processor.start()
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print('YARRRR BROKE: {}'.format(e), file=sys.stderr)
    finally:
        print('YARRRRRRR NO MORE PIRATE TALK TODAY!!!!!')
        if processor is not None:
            processor.stop()
