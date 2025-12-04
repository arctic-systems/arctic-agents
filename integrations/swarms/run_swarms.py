import sys
import json
from swarmRouter import run_swarms_workflow

if __name__ == "__main__":
    task = sys.argv[1]
    strategy = sys.argv[2]
    registry_json = sys.argv[3]  # passed directly from Node

    result = run_swarms_workflow(task, strategy, registry_json)

    print(json.dumps(result))
