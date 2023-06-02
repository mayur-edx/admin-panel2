import { DependencyList, EffectCallback, useEffect } from "react";

const useDebouncedEffect = (effect: EffectCallback, delay: number, deps?: DependencyList) => {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay);

		return () => clearTimeout(handler);
		// usin || because ts complains about deps, if its optional it can be undefined
	}, [...(deps || []), delay]);
};

export default useDebouncedEffect;
