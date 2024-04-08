class Result:
    def __init__(self, data):
        self.data = data
        self.processed = False

    def get(self):
        if not self.processed:
            self.processed = True
            #similarities = self.search_algorithm.search(list(self.tc_embs.values()), query_embedding)
            threshold = 0.75
            #matches = [name for name, sim in zip(self.tc_embs.keys(), similarities) if sim.item() > threshold]
            #result_data = self._prepare_result(matches)
        else:
            result_data = self.data
        return self.data