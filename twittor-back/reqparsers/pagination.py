def parse_pagination(parser):
    parser.add_argument('limit', type=int, help='Limit should be integer', default=10)
    parser.add_argument('page', type=int, help='Page should be integer', default=0)

    args = parser.parse_args()
    limit = args['limit']
    skip = (args['page'] - 1) * limit

    return {'limit': limit, 'skip': skip, 'page': args['page']}
