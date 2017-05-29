import { createServer } from 'http'
import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import { SubscriptionServer } from 'subscriptions-transport-ws'

export default ({ schema,pubsub, server  }) => {
    const subscriptionManager = new SubscriptionManager({
        schema,
        pubsub,
        setupFunctions: {
            clock: (options, args) => ({
                clock: (clock: Date) => {
                    const onlyMinutesArg = "onlyMinutesChange";
                    if ( args[onlyMinutesArg] ) {
                        return clock.getTime() % 60 === 0;
                    }
                    return true;
                },
            }),
        },
    });

    return new SubscriptionServer({
            subscriptionManager,
            onConnect: async (connectionParams, ws) => {
                console.log('✅  SubscriptionServer onConnect 🌏!', ws._socket.remoteAddress, ws._socket.remotePort)
            },
            onOperationComplete: () => {
                console.log('✅  SubscriptionServer onUnsubscribe 👋')
            },
            onDisconnect: (webSocket) => {
                console.log('✅  SubscriptionServer onDisconnect ❌')
            },
            onOperation: async (msg, params) => {
                console.log('✅  SubscriptionServer onSubscribe 😄')
                return Promise.resolve(params)
            },
        },
        {
            server: server,
            path: '/subscription'
        }
    )
}