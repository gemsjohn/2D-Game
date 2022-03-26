export function drawStatusText(context, input, player) {
    context.font = '10px Helvetica';
    context.fillText('Last input: ' + input.lastKey, 20, 50);
    context.fillText('Active state: ' + player.currentState.state, 20, 90)
}