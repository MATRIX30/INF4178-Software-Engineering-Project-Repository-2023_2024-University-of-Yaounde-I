import 'dart:math';
import 'package:flutter/material.dart';

class RecordingIndicator extends StatefulWidget {
  @override
  _RecordingIndicatorState createState() => _RecordingIndicatorState();
}

class _RecordingIndicatorState extends State<RecordingIndicator>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Animation<double>> _animations;
  final Random _random = Random();

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 4),
    )..repeat();

    _animations = List.generate(5, (index) {
      double start = index / 5;
      double end = (index + 1) / 5;
      return TweenSequence([
        TweenSequenceItem(
          tween: Tween<double>(begin: 0.5, end: 1.5).chain(CurveTween(curve: Curves.easeInOut)),
          weight: 50,
        ),
        TweenSequenceItem(
          tween: Tween<double>(begin: 1.5, end: 0.5).chain(CurveTween(curve: Curves.easeInOut)),
          weight: 50,
        ),
      ]).animate(
        CurvedAnimation(
          parent: _controller,
          curve: Interval(start, end, curve: Curves.easeInOut),
        ),
      );
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  double _randomSize() {
    return 60 + _random.nextInt(40).toDouble();  // Random size between 60 and 100
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(5, (index) {
        return AnimatedBuilder(
          animation: _animations[index],
          builder: (context, child) {
            return Container(
              margin: EdgeInsets.symmetric(horizontal: 8.0),
              width: 60 * _animations[index].value,
              height: 60 * _animations[index].value,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Theme.of(context).iconTheme.color,
              ),
            );
          },
        );
      }),
    );
  }
}