# cinabono-engine

Cinabono is the standalone core engine powering the Gately logic
simulator.  
It handles schema management, deterministic simulation, event
processing, plugin system, dependency injection, and other internal
mechanics.  

## Installation

    # Clone repository
    git clone https://github.com/markbrosalin/cinabono-engine.git
    cd cinabono-engine

    # Install pnpm (if missing)
    npm install -g pnpm

    # Install dependencies
    pnpm install

## Running examples

You can find example plugins, wrappers, DI configs, API extensions, and
basic circuits here:

    packages/engine/src/tests/plugin-examples/  
    packages/engine/src/tests/*.test.ts 

To run tests:

    pnpm test

Some tests are disabled using ````describe.skip````.
To run a specific example, replace it with ````describe````.
